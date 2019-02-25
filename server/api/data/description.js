'use strict'

function getDescription(type){

    switch(type) {
        case 'SelfActulization':
            return [
                {
                    name: 'Morals',
                    Beginner: "Evaluate internal process for making choices. Identify core values and personal code of ethics",
                    Developing: "",
                    Accomplished: "",
                    Exemplary: "",
                },
                {
                    name: 'Perception',
                    Beginner: "",
                    Developing: "",
                    Accomplished: "",
                    Exemplary: "",
                },
                {
                    name: 'Gratitude',
                    Beginner: "",
                    Developing: "",
                    Accomplished: "",
                    Exemplary: "",
                },
                {
                    name: 'Happiness',
                    Beginner: "",
                    Developing: "",
                    Accomplished: "",
                    Exemplary: "",
                },
                {
                    name: 'Social',
                    Beginner: "",
                    Developing: "",
                    Accomplished: "",
                    Exemplary: "",
                },
                {
                    name: 'Other',
                    Beginner: "",
                    Developing: "",
                    Accomplished: "",
                    Exemplary: "",
                },
              
            ]
        case 'ProfessionalAcademic':
            return [
                {
                    name: 'Major',
                    Beginner: "Acknowledgeing one's personal vaules and beliefs",
                    Developing: "Reasearch and gather self-assessment information as well as collaborate with professional",
                    Accomplished: "Identification and pursuit of a major or career",
                    Exemplary: "Successful completion of degree/certificatet. Launching in the career of your choice",
                },
                {
                    name: 'Specialization',
                    Beginner: "Identify what sepcializqtions are possible",
                    Developing: "Which strengths of yours are matched to which specialization",
                    Accomplished: "Develop skill sets necessary to your specialization",
                    Exemplary: "Recongnition in your field of mastery",
                },
                {
                    name: 'Satisfaction',
                    Beginner: "Knowing what job satisfication means for you",
                    Developing: "Cultivation of strategies to achieve job satisfication",
                    Accomplished: "Begin to find the balkance between job satisfication and challenge/growth",
                    Exemplary: "Consistent balance between professional growth and achievement",
                },
                {
                    name: 'Persona',
                    Beginner: "Able to identify where you want to be",
                    Developing: "Listen to external feedback and personal reflection",
                    Accomplished: "Integration of both internal and external feedback",
                    Exemplary: "Contentment with professional persona and a drive for refinement",
                },
                {
                    name: 'Ethic',
                    Beginner: "Complete understanding of the job/work/tasks at hand",
                    Developing: "Increase tolerance for effort necessary to complete job/work/task",
                    Accomplished: "Maintain the ouput necessary",
                    Exemplary: "Allow your work to inspire others",
                },
                {
                    name: 'Skills',
                    Beginner: "Identify strengths and weaknesses in these skill sets",
                    Developing: "Research and discovery of the skill sets that work for them",
                    Accomplished: "Working on the identified skill sets to improve on weaknesses and enhance existing strengths",
                    Exemplary: "Consisten utilization of skills and mentorships to others of skills developed",
                },
              
            ]
        case 'Community':
            return [
                {
                    name: 'Physcial',
                    Beginner: "Recognizing your place in your environment ",
                    Developing: "Acknowledging your impact in/with your environment",
                    Accomplished: "Being an active participant in positively shaping your environement",
                    Exemplary: "Motivating an leading others",
                },
                {
                    name: 'Service',
                    Beginner: "How I serve",
                    Developing: "Recognizing the importance of service and identifying where to serve",
                    Accomplished: "Regularly servicing the community",
                    Exemplary: "On-going service, creating service opportunities for self and others",
                },
                {
                    name: 'Culture',
                    Beginner: "Identify and appreciate your own culture",
                    Developing: "Explorint new cultures",
                    Accomplished: "Finding values in other cultures",
                    Exemplary: "Engaging and mentoring others in various cultures and their events",
                },
                {
                    name: 'Social',
                    Beginner: "What are your social supports",
                    Developing: "Acknowledging and actively seeking positive networks",
                    Accomplished: "Consistently utilizing and maintaining social networks",
                    Exemplary: "Inclusion of others in your networking circle, sharing your resources for those in development",
                },
            ]
        case 'Emotional':
            return [
                {
                    name: "Attitude",
                    Beginner: "Knows the difference between a positive and a negative attitude",
                    Developing: "Understands what impacts attitude internally and externally",
                    Accomplished: "Works to build new positive experiences and learning experience perspective",
                    Exemplary: "Consistently feels there are options and learns from challenges",
                },
                {
                    name: 'Feelings',
                    Beginner: "Senses when there is a strong feeling and reaction to a person, place or event",
                    Developing: "Can differentiate between feelings, thoughts, and actions",
                    Accomplished: "Can make clear feeling statements when appropriate",
                    Exemplary: "Allows for the experiecne of feelings, can express them clearly, and maintain rational thought",
                },
                {
                    name: 'Empathy',
                    Beginner: "Recognizes feelings in others",
                    Developing: "Can listen to others calmly while ther express their feelings",
                    Accomplished: "Can express understanding for feelings of others",
                    Exemplary: "Regularly allows for the feelings of others even when they are contrast with their own feelings",
                },
                {
                    name: 'Coping',
                    Beginner: "Recognizes that feelings are sometimes overwhelming",
                    Developing: "Actively uses one or two coping skills, such as a deep breath, or counting to 10",
                    Accomplished: "Expands coping skil set to 5 or more techniques that work",
                    Exemplary: "Regularly uses 5 or more coping skills that help maintain calm",
                },
                {
                    name: 'Insight',
                    Beginner: "Learning to differentiate between positive and negative emotional states",
                    Developing: "Recognition of people and situations that trigger emotional responses",
                    Accomplished: "Finding ways to recognize similarities in new and old emotional patterns",
                    Exemplary: "Consistent ability to foster relationships and dynamics that create positive emotion",
                },
                {
                    name: 'Management',
                    Beginner: "Recognizing emotional patterns",
                    Developing: "Anticipating internal emotional shifts and creating positive coping mechanisms",
                    Accomplished: "Regular management of internal emotional patterns",
                    Exemplary: "Consistent internal monitoring/ability to recongize and adapt to new emotional patterns",
                },
            ]
          // code block
          break;
        default:
          // code block
      }
}

module.exports = {
    getDescription: getDescription
};