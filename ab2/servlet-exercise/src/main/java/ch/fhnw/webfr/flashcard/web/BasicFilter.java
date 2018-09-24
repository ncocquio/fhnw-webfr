package ch.fhnw.webfr.flashcard.web;

import org.apache.log4j.Logger;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class BasicFilter implements Filter {
    Logger logger;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        logger = Logger.getRootLogger();
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        logger.info("Before request [uri=" + ((HttpServletRequest) request).getRequestURI() + "]");
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {

    }
}
