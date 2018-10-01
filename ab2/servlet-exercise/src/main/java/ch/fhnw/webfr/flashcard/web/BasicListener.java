package ch.fhnw.webfr.flashcard.web;

import ch.fhnw.webfr.flashcard.persistence.QuestionnaireRepository;
import ch.fhnw.webfr.flashcard.util.QuestionnaireInitializer;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class BasicListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        QuestionnaireRepository questionnaireRepository;

        if ("test".equals(sce.getServletContext().getInitParameter("mode"))) {
            questionnaireRepository = new QuestionnaireInitializer().initRepoWithTestData();
        } else {
            questionnaireRepository = new QuestionnaireRepository();
        }

        sce.getServletContext().setAttribute("repo", questionnaireRepository);
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {

    }
}
