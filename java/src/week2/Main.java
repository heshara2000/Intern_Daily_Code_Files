package week2;

public class Main {
	public static void main(String[] args) {
		Mailbox obj = new Mailbox();
		Runnable consumer = new Consumer(obj);
		Thread consumerThread = new Thread(consumer, "Consumer Thread");
		Runnable producer = new Producer(obj);
		Thread producerThread = new Thread(producer, "Producer Thread");
		consumerThread.start();
		producerThread.start();
		
//		Runnable t1 = new Threadlifecycle();
//		Thread thread1 = new Thread(t1, "My thread 01");
//		System.out.println(thread1.getName()+"is current state"+thread1.getState());
//		
//		Runnable t2 = new Threadlifecycle();
//		Thread thread2 = new Thread(t2, "My thread 01");
//		
//		Runnable t3 = new Threadlifecycle();
//		Thread thread3 = new Thread(t3, "My thread 01");
//		
//		thread1.start();
//		try {
//			thread1.join();
//		}catch (InterruptedException e) {
//			e.printStackTrace();
//		}
//		thread2.start();
//		try {
//			thread2.join();
//		}catch (InterruptedException e) {
//			e.printStackTrace();
//		}
//		thread3.start();
//		try {
//			thread3.join();
//		}catch (InterruptedException e) {
//			e.printStackTrace();
//		}
//		
//		System.out.println(thread1.getName()+"is current state"+thread1.getState());
//		System.out.println(thread2.getName()+"is current state"+thread2.getState());
//		System.out.println(thread3.getName()+"is current state"+thread3.getState());
//		
	}
		

}
