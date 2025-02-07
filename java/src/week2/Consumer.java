package week2;

public class Consumer implements Runnable {
	private Mailbox box;
	public Consumer(Mailbox box) {
		super();
		this.box = box;
	}
	
	public void run() {
		for(int i=1;i<10; i++) {
			int value=box.getValue();
			
			System.out.println(Thread.currentThread().getName()+" consume the value");
			
		}
	}

}
