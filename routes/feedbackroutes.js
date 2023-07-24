const feedback = require('../controllers/feedbackController')
const express = require('express')
const routes = express()

routes.post('/createFeedback',feedback.createFeedback)
routes.get('/getAllFeedback',feedback.getAllFeedback)
routes.get('/feedbackCategory',feedback.getAllFeedbackCategory)
routes.post('/createFeedbackCategory',feedback.createFeedbackCategory)
routes.delete('/deleteFeedback/:id',feedback.deleteFeedback)
routes.post('/getSingleFeedback/:id',feedback.updateFeedback)
routes.delete('/deleteFeedbackCategory/:id',feedback.deleteFeedbackCategory)
routes.get('/getSingleFeedback/:id',feedback.getSingleFeedback)
routes.patch('/updateFeedback/:id', feedback.updateFeedbackQuestion);
routes.delete('/deleteFeedbackQuestion/:id', feedback.deleteFeedbackQuestion);
routes.post('/addNewFeedbackQuestion/:id', feedback.addNewFeedbackQuestion);

module.exports=routes
