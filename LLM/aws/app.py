import boto3
import botocore.config
import json
import response
import datetime


def blog_generate_using_bedrock(blogtopic:str)-> str:
    prompt=f"""<s>[INST]Human: write a 200 words blog on the topic {blogtopic}
    Assistant:[INST]

    """
    body={
        "prompt":prompt,
        "max_gen_len":512,
        "temperature":0.5,
        "top_p":1,
        
    }
    try:
        bedrock=boto3.client("bedrock-runtime",region_name="us-east-1",
                             config=botocore.config.Config(read_timeout=300,retries={"max_attempts":3}))
        bedrock.invoke_model(body=json.dumps(body),modelId="meta.llama2-13b-chat-v1")
        response_content=response.get('body').read()
        response_data=json.loads(response_content)
        print(response_data)
        blog_details=response_data['generation']
        return blog_details
    except Exception as e:
        print(f"error generating the code: {e}")
        return ""
    
def save_blog_details(s3_key,s3_bucket,generate_blog):
    s3=boto3.client("s3")
    


def lambda_handler(event, context):
    # TODO implement
    event=json.loads(event['body'])
    blogtopic=event['blog_topic']

    generate_blog=blog_generate_using_bedrock(blogtopic)

    if generate_blog:
        current_time=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        s3_key=f"blog-output/{current_time}.txt"
        s3_bucket='aws_bedrock_course1'
        save_blog_details(s3_key,s3_bucket,generate_blog)
    else:
        print("Error generating the blog")
    return {
        'statusCode': 200,
        'body': json.dumps('Blog generated successfully')
    }
