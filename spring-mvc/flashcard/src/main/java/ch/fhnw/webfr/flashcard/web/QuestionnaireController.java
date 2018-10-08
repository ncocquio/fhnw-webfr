package ch.fhnw.webfr.flashcard.web;

import ch.fhnw.webfr.flashcard.domain.Questionnaire;
import ch.fhnw.webfr.flashcard.persistence.QuestionnaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("/questionnaires")
public class QuestionnaireController {

    @Autowired
    private QuestionnaireRepository questionnaireRepository;

    @GetMapping
    public String findAll(Model model, @RequestParam(required=false) String form) {
        if (null == form) {
            model.addAttribute("questionnaires", questionnaireRepository.findAll());

            return "list";
        }

        model.addAttribute("questionnaire", new Questionnaire());
        return "create";
    }

    @PostMapping
    public String create(Questionnaire questionnaire) {
        questionnaireRepository.insert(questionnaire);

        return "create";
    }

    @GetMapping(path = "/{id}")
    public String findById(@PathVariable String id, Model model) {
        Optional<Questionnaire> questionnaire = questionnaireRepository.findById(id);

        if (questionnaire.isPresent()) {
            model.addAttribute("questionnaire", questionnaire.get());
        }

        return "show";
    }
}
