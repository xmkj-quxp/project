package com.example.demo.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping("/xxx")
@Controller
public class TestController {


//    @GetMapping
//    @RequestMapping("/")
//    public ModelAndView toIndex() {
//        ModelAndView pageMV = new ModelAndView();
//        pageMV.setViewName("login");
//        return pageMV;
//    }
//
//
//    @ModelAttribute
//    public void beforeTwo(String age, Model model){
//        model.addAttribute("age",age);
//        System.out.println("beforeTwo:"+age);
//    }
//
//
//    @ModelAttribute(value = "name")
//    public String beforeOne(String name){
//        System.out.println("beforeOne:"+name);
//        return name;
//    }
//
//    @ModelAttribute(value = "name")
//    public String beforeThree(String name){
//        System.out.println("beforeThree:"+name);
//        return name;
//
//    }
//
//
//
//
//
//
//
//    @RequestMapping("/hello")
//    @ResponseBody
//    public String hello(String name,String age,Model model){
//        System.out.println(model.containsAttribute("age1"));
//        return "";
//    }
//
//    @RequestMapping("/hi")
//    @ResponseBody
//    public String hi(String name,String age,Model model){
//        System.out.println(model.containsAttribute("age"));
//        System.out.println(model);
//        return "";
//    }


}
