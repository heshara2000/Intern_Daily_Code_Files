package com.telusko.SpringBootDemo;

public class Allien {

    private int age;
    private Laptop lap;

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Laptop getLap() {
        return lap;
    }

    public void setLap(Laptop lap) {
        this.lap = lap;
    }

    public Allien(){
        System.out.println("Object Created");
    }
    public Allien(int age, Laptop lap){
        this.age = age;
        this.lap = lap;
    }
    //Laptop laptop;
    public void code(){
        //laptop.compile();
        System.out.println("coding");
    }
}
