package com.example.demo.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping("/")
@Controller
public class LoginController {


    @GetMapping
    @RequestMapping("/")
    public ModelAndView toIndex() {
        ModelAndView pageMV = new ModelAndView();
        pageMV.setViewName("login");
        return pageMV;
    }


}
