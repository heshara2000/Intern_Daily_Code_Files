package week2;

public class Producer implements Runnable  {
	private Mailbox box;
	
	public Producer(Mailbox box) {
		super();
		this.box=box;
	}
	
	public void run() {
		for(int i=1;i<=10;i++) {
			box.putValue(i);
			System.out.println(Thread.currentThread().getName()+" produced the value");
			
		}
	}
	

}
