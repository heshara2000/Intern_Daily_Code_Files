package week2;

public class Mailbox {
	private int value;  //state the resource
	private boolean available = false;  //variable to coordinate between two threads
	
	public synchronized void putValue(int value) {
		while (available) {
			try {
				wait(10);
				System.out.println(Thread.currentThread().getName()+"timeout"+"resource available"+available);
				
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	
	
	this.value = value;
	this.available = true;
	notifyAll(); //notify all the other threads that is in the waitset on the mailbox object
	}
	
	public synchronized int getValue() {
		while (!available) {
			try {
				wait();
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		this.available = false;
		notifyAll();
		return value;
	}
	
	

}
