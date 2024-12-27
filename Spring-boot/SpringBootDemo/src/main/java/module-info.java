module com.javatechie.springbootdemo {
    requires javafx.controls;
    requires javafx.fxml;

    requires org.kordamp.bootstrapfx.core;

    opens com.javatechie.springbootdemo to javafx.fxml;
    exports com.javatechie.springbootdemo;
}