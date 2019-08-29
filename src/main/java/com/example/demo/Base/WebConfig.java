package com.example.demo.Base;

import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.List;

@Component
public class WebConfig implements WebMvcConfigurer {

    @Resource
    private WebHandlerInterceptorAdapter webHandlerInterceptorAdapter;

    // 需排除拦截的地址
    private final List<String> EXCLUDE_PATH_LIST = Arrays.asList("/","/favicon.ico");

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

        registry.addInterceptor(webHandlerInterceptorAdapter)
        .excludePathPatterns(EXCLUDE_PATH_LIST);

    }




}
