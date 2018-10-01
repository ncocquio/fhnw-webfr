package ch.fhnw.webfr.flashcard.web;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class LanguageFilter extends HttpServletResponseWrapper {
    /**
     * Constructs a response adaptor wrapping the given response.
     *
     * @param response the {@link HttpServletResponse} to be wrapped.
     * @throws IllegalArgumentException if the response is null
     */
    public LanguageFilter(HttpServletResponse response) {
        super(response);

        Properties prop = new Properties();
        InputStream resource = Thread.currentThread().getContextClassLoader().getResourceAsStream("language-en.properties");
        try {
            prop.load(resource);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
