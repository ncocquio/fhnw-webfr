const log4js = require('log4js');
const express = require('express');
const dispatcher = express.Router();
const Questionnaire = require('../domain/questionnaire');

const logger = log4js.getLogger('questionnaire-controller');

dispatcher.route('/questionnaires/')
    .get((req, res) => {
        Questionnaire.find((err, questionnaires) => {
            if (err) {
                res.status(400).send('database error');
            }
            logger.debug(`Found ${questionnaires.length} questionnaires`);
            res.status(200).json(questionnaires);
        })
    })
    .post((req, res) => {
        let questionnaire = new Questionnaire();
        questionnaire.set(req.body);

        questionnaire.save((err, newQuestionnaire) => {
            if (err) {
                res.status(400).send('database error');
                return;
            }
            logger.debug('Inserted questionnaire');
            res.status(200).json(newQuestionnaire);
        })
    });

dispatcher.route('/questionnaires/:id')
    .get((req, res) => {
        Questionnaire.findById(req.params.id, (err, questionnaire) => {
            if (err) {
                res.status(400).send('database error');
            }
            logger.debug(`Found questionnaire with id "${questionnaire.id}"`);
            res.status(200).json(questionnaire);
        })
    })
    .put((req, res) => {
        Questionnaire.findById(req.params.id, (err, questionnaire) => {
            if (err) {
                res.status(400).send('database error');
                return;
            }

            questionnaire.set(req.body);

            questionnaire.save((err, newQuestionnaire) => {
                if (err) {
                    res.status(400).send('database error');
                    return;
                }
                logger.debug(`Updated questionnaire with id "${questionnaire.id}"`);
                res.status(200).json(newQuestionnaire);
            })
        })
    })
    .delete((req, res) => {
        Questionnaire.findById(req.params.id, (err, questionnaire) => {
            if (err) {
                res.status(400).send('database error');
                return;
            }

            Questionnaire.deleteOne(questionnaire, (err) => {
                if (err) {
                    res.status(400).send('database error');
                    return;
                }
                logger.debug(`Deleted questionnaire with id "${questionnaire.id}"`);
                res.status(200).json({});
            });
        })
    });


// export dispatcher to be able to use it outside of this module
module.exports = dispatcher;