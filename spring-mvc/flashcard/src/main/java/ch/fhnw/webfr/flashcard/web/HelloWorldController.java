package ch.fhnw.webfr.flashcard.web;

import ch.fhnw.webfr.flashcard.domain.Questionnaire;
import ch.fhnw.webfr.flashcard.persistence.QuestionnaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@Controller
@RequestMapping("/hello")
public class HelloWorldController {
    @Autowired
    private QuestionnaireRepository questionnaireRepository;

    @GetMapping
    public void hello(@RequestParam String name, HttpServletResponse response, HttpServletRequest request) throws IOException {
        List<Questionnaire> questionnaires = questionnaireRepository.findAll();
        PrintWriter writer = response.getWriter();
        writer.append("<html><head><title>Example</title></head><body>");
        writer.append("<h3>Hello " + name + "</h3>");
        writer.append("<h3>You have " + questionnaires.size() + " questionnaires in your repo</h3>");
        writer.append("</body></html>");
    }
}
