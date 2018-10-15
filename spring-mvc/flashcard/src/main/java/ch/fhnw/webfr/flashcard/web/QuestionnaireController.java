package ch.fhnw.webfr.flashcard.web;

import ch.fhnw.webfr.flashcard.domain.Questionnaire;
import ch.fhnw.webfr.flashcard.persistence.QuestionnaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@Controller
@RequestMapping("/questionnaires")
public class QuestionnaireController {

    @Autowired
    private QuestionnaireRepository questionnaireRepository;

    @GetMapping
    public String findAll(Model model, @RequestParam(required=false) String form, @RequestParam(required=false) String message, @RequestParam(required=false) String status) {
        if (null == form) {
            model.addAttribute("questionnaires", questionnaireRepository.findAll());
            model.addAttribute("message", message);
            model.addAttribute("status", status);

            return "list";
        }

        model.addAttribute("questionnaire", new Questionnaire());

        return "create";
    }

    @PostMapping
    public String create(@Valid Questionnaire questionnaire, BindingResult result) {

        if (result.hasErrors()) {
            return "create";
        }

        questionnaireRepository.insert(questionnaire);

        return "redirect:/questionnaires?message=Card inserted!&status=success";
    }

    @GetMapping(path = "/{id}")
    public String findById(@PathVariable String id, Model model) {
        Optional<Questionnaire> questionnaire = questionnaireRepository.findById(id);

        if (questionnaire.isPresent()) {
            model.addAttribute("questionnaire", questionnaire.get());
        } else {
            return "redirect:/questionnaires?message=Card not found!&status=error";
            //return "404";
        }

        return "show";
    }

    @GetMapping(path = "edit/{id}")
    public String editById(@PathVariable String id, Model model) {
        Optional<Questionnaire> questionnaire = questionnaireRepository.findById(id);

        if (questionnaire.isPresent()) {
            model.addAttribute("questionnaire", questionnaire.get());
        } else {
            return "redirect:/questionnaires?message=Card not found!&status=error";
            //return "404";
        }

        return "edit";
    }

    @DeleteMapping(path = "/{id}")
    public String delete(@PathVariable String id, Model model) {
        Optional<Questionnaire> questionnaire = questionnaireRepository.findById(id);

        if (questionnaire.isPresent()) {
            questionnaireRepository.delete(questionnaire.get());
        } else {
            return "redirect:/questionnaires?message=Card not found!&status=error";
            //return "404";
        }

        return "redirect:/questionnaires?message=Card deleted!&status=success";
    }

    @PutMapping
    public String editById(@Valid Questionnaire questionnaire, BindingResult result, Model model) {
        Optional<Questionnaire> oldQuestionnaire = questionnaireRepository.findById(questionnaire.getId());

        if (oldQuestionnaire.isPresent()) {
            questionnaireRepository.save(questionnaire);
        } else {
            return "redirect:/questionnaires?message=Card not found!&status=error";
            //return "404";
        }

        return "redirect:/questionnaires?message=Card updated!&status=success";
    }
}
