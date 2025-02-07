package week2;

public  class Threadlifecycle implements Runnable{

	@Override
	public void run() { 
		for (int i=0; i < 25; i++) {
			System.out.println(Thread.currentThread().getName()+" " +i);
			try {
				Thread.sleep(i);
			}catch (InterruptedException e) {
				System.out.println("ERROR"+e.getMessage());
			}
		}
		// TODO Auto-generated method stub
		
	}
	

}
