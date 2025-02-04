import React, { useState } from 'react';
import { Calendar, Download, Star, Clock, Users, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EndMeeting = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const meetingSummary = {
    duration: '1 hour 30 minutes',
    participants: 8,
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    date: 'February 4, 2024'
  };

  const handleSubmitFeedback = () => {
    // Ici vous pourriez envoyer le feedback à votre backend
    console.log({ rating, feedback });
    setFeedbackSent(true);
  };

  const handleDownloadSummary = () => {
    // Logique pour télécharger le résumé
    console.log('Downloading summary...');
  };

  const handleReturnToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Meeting Ended
          </h1>
          <p className="text-gray-400 mb-8">
            Thank you for participating in the meeting
          </p>

          {/* Meeting Summary */}
          <div className="bg-gray-700 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              Meeting Summary
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Clock className="w-5 h-5" />
                <span>Duration: {meetingSummary.duration}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Users className="w-5 h-5" />
                <span>Participants: {meetingSummary.participants}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="w-5 h-5" />
                <span>{meetingSummary.date}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Clock className="w-5 h-5" />
                <span>{meetingSummary.startTime} - {meetingSummary.endTime}</span>
              </div>
            </div>
          </div>

          {/* Download Summary Button */}
          <button
            onClick={handleDownloadSummary}
            className="flex items-center justify-center gap-2 w-full bg-gray-700 text-white rounded-lg py-3 px-4 hover:bg-gray-600 transition-colors mb-8"
          >
            <Download className="w-5 h-5" />
            Download Meeting Summary
          </button>

          {/* Feedback Section */}
          {!feedbackSent ? (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">
                How was your meeting experience?
              </h2>
              
              {/* Star Rating */}
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-500'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Feedback Text Area */}
              <div>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your feedback about the meeting (optional)"
                  className="w-full bg-gray-700 text-white rounded-lg p-4 h-32 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitFeedback}
                className="w-full bg-blue-500 text-white rounded-lg py-3 px-4 hover:bg-blue-600 transition-colors"
              >
                Submit Feedback
              </button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-green-400 text-xl font-semibold">
                Thank you for your feedback!
              </div>
              <p className="text-gray-400">
                Your feedback helps us improve our service.
              </p>
            </div>
          )}

          <button
            onClick={handleReturnToHome}
            className="flex items-center justify-center gap-2 w-full mt-8 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndMeeting;