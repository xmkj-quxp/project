package com.example.demo.Base;

import org.springframework.context.annotation.Import;

import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Import(QuxpConfiguration.class)
public @interface EnableQuxp {

}
