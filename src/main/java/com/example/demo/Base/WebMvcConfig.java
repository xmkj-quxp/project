package com.example.demo.Base;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.util.AntPathMatcher;
import org.springframework.validation.MessageCodesResolver;
import org.springframework.validation.Validator;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.config.annotation.*;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.List;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Resource
    private WebHandlerInterceptorAdapter webHandlerInterceptorAdapter;

    // 需排除拦截的地址
    private final List<String> EXCLUDE_PATH_LIST = Arrays.asList(
            "/"
            ,"/favicon.ico"
            ,"/plugins/**"
            ,"/common/**"
            ,"/manage/**"
    );



    /**
     * 注册拦截器
     * @param registry
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        registry.addInterceptor(webHandlerInterceptorAdapter).excludePathPatterns(EXCLUDE_PATH_LIST);

    }


    @Override
    public void configurePathMatch(PathMatchConfigurer configurer){
        AntPathMatcher matcher = new AntPathMatcher();
        // true: URL大小写敏感
        matcher.setCaseSensitive(true);
        configurer.setPathMatcher(matcher);
    }

    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {

    }

    @Override
    public void configureAsyncSupport(AsyncSupportConfigurer configurer) {

    }

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {

    }

    @Override
    public void addFormatters(FormatterRegistry registry) {

    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

    }

    /**
     * 配置CORS实现跨域
     * @param registry
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {

    }

    /**
     * 最经常用到的就是"/"路径请求时不通过@RequestMapping配置
     * 而是直接通过配置文件映射指定请求路径到指定View页面，
     * 当然也是在请求目标页面时不需要做什么数据处理才可以这样使用
     * @param registry
     */
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
//        registry.addViewController("/").setViewName("login");
    }


//    /**
//     * 配置请求视图映射
//     * @return
//     */
//    @Bean
//    public SpringResourceTemplateResolver templateResolver()
//    {
//        SpringResourceTemplateResolver thymeleafViewResolver = new SpringResourceTemplateResolver();
//        //请求视图文件的前缀地址
//        thymeleafViewResolver.setPrefix("classpath:/new/");
//        //请求视图文件的后缀
//        thymeleafViewResolver.setSuffix(".html");
//        return thymeleafViewResolver;
//    }
//
//
//    /**
//     * Thymeleaf 标准方言解析器
//     */
//    @Bean
//    public SpringTemplateEngine templateEngine(){
//        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
//        templateEngine.setTemplateResolver(templateResolver());
//        // 支持SpringEL表达式
//        templateEngine.setEnableSpringELCompiler(true);
//
//        return templateEngine;
//    }
//
//    /**
//     * 视图解析器
//     */
//    @Bean
//    public ThymeleafViewResolver viewResolver(){
//        ThymeleafViewResolver viewResolver =  new ThymeleafViewResolver();
//        viewResolver.setTemplateEngine(templateEngine());
//        return viewResolver;
//    }


    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {

//        registry.jsp()
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {

    }

    @Override
    public void addReturnValueHandlers(List<HandlerMethodReturnValueHandler> handlers) {

    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {

    }

    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {

    }

    @Override
    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {

    }

    @Override
    public void extendHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {

    }

    @Override
    public Validator getValidator() {
        return null;
    }

    @Override
    public MessageCodesResolver getMessageCodesResolver() {
        return null;
    }
}
