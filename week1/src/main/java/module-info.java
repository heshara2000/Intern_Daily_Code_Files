module com.javatechie.week1 {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.javatechie.week1 to javafx.fxml;
    exports com.javatechie.week1;
}