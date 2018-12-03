package ch.fhnw.webfr.flashcard.web;

import ch.fhnw.webfr.flashcard.domain.Questionnaire;
import ch.fhnw.webfr.flashcard.persistence.QuestionnaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/questionnaires")
public class QuestionnaireController {
    @Autowired
    private QuestionnaireRepository questionnaireRepository;

    @CrossOrigin(origins = "http://localhost:9000")
    @GetMapping
    public ResponseEntity<List<Questionnaire>> findAll() {
        return new ResponseEntity<>(questionnaireRepository.findAllByOrderByIdAsc(), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Questionnaire> findQuestionnaireById(@PathVariable String id) {
        Optional<Questionnaire> maybeQuestionnaire = questionnaireRepository.findById(id);
        if (maybeQuestionnaire.isPresent()) {
            return new ResponseEntity<>(maybeQuestionnaire.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Questionnaire> createQuestionnaire(@Valid @RequestBody Questionnaire questionnaire, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(questionnaire, HttpStatus.PRECONDITION_FAILED);
        }

        Questionnaire savedQuestionnaire = questionnaireRepository.insert(questionnaire);

        return new ResponseEntity<>(savedQuestionnaire, HttpStatus.CREATED);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Questionnaire> updateQuestionnaireById(@PathVariable String id, @Valid @RequestBody Questionnaire questionnaire, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(questionnaire, HttpStatus.PRECONDITION_FAILED);
        }

        Optional<Questionnaire> maybeQuestionnaire = questionnaireRepository.findById(id);
        if (maybeQuestionnaire.isPresent()) {
            Questionnaire savedQuestionnaire = questionnaireRepository.save(questionnaire);
            return new ResponseEntity<>(savedQuestionnaire, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Questionnaire> deleteQuestionnaireById(@PathVariable String id) {
        Optional<Questionnaire> maybeQuestionnaire = questionnaireRepository.findById(id);
        if (maybeQuestionnaire.isPresent()) {
            questionnaireRepository.delete(maybeQuestionnaire.get());
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
