package com.example.demo.Base;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;

@Component
public class WebConfig implements WebMvcConfigurer {

    @Resource
    private WebHandlerInterceptorAdapter webHandlerInterceptorAdapter;

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer){
        AntPathMatcher matcher = new AntPathMatcher();
        // true: URL大小写敏感
        matcher.setCaseSensitive(true);
        configurer.setPathMatcher(matcher);
    }

    /**
     * 注册拦截器
     * @param registry
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        registry.addInterceptor(webHandlerInterceptorAdapter);

    }
}
