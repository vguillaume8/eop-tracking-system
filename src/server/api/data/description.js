'use strict'

function getDescription(type) {

    switch(type) {
        case 'SelfActulization':
            return [
                {
                    description: "The building and recognition of our sense of self, our values, and how we practice them in the world."
                },
                {
                    name: 'Morals',
                    Beginner: "Evaluate internal process for making choices. Identify core values and personal code of ethics",
                    Developing: "Recognition of personal values as they relate to family and personal ethics",
                    Accomplished: "Understanding of cognitive dissonance and integration of new information into personal ethics",
                    Exemplary: "Consistent attention to impact of new understanding of self and others on personal values and consideration of values in decision making",
                },
                {
                    name: 'Perception',
                    Beginner: "Recognition of variations in pereception of people and situations",
                    Developing: "Understanding of personal truth and how perception can be different in each instance for each person",
                    Accomplished: "Application of self-awareness to clarify perceptions and adapt to new information",
                    Exemplary: "Consistent ability to judge situations and people with clarity and honesty, flexiible and adaptable",
                },
                {
                    name: 'Gratitude',
                    Beginner: "Recognition of the positive aspects of everydat situations and people",
                    Developing: "Creating internal process to seek gratitude",
                    Accomplished: "Regularly finding gratitude",
                    Exemplary: "Acceptance of responsibility and ownership of role in finding gratitude consistently",
                },
                {
                    name: 'Happiness',
                    Beginner: "Recognize personal challenges, strengths, and internal drives and motivations",
                    Developing: "Creating patterns that offer positive drives and passions to shape outlook",
                    Accomplished: "Consistently able to recognize and make choices that support personal growth and positive self-regard",
                    Exemplary: "Generalized feeling of positive joy even in face of adversity",
                },
                {
                    name: 'Social',
                    Beginner: "Recognition of importance of positive caring relationships and detrimental relationships",
                    Developing: "Creating mutually supportive positive relationships while building healthy boundaries in negative relationships",
                    Accomplished: "Regular acts of kindness and compassion and ability to rely on kindness and caring of others",
                    Exemplary: "Caring about the wellbeing of others and acting out of that care",
                },
                {
                    name: 'Autonomy',
                    Beginner: "Recognition of reliance on authority and reassurance of others",
                    Developing: "Seeking ways to rely on own judgments and accepting responsibility for choices",
                    Accomplished: "Consistent pattern of seeking outside information but using internal process of self-reliance",
                    Exemplary: "Resourceful and independent comfortable in company and solitude",
                },
                {
                    name: 'Communication',
                    Beginner: "Self-reflection of communication strengths and challenges",
                    Developing: "Seeking support and information to develop stronger communication skills",
                    Accomplished: "Regularly able to express self clearly and listen with respect to others",
                    Exemplary: "Consistent clear communication and ongoing integration of new skills",
                }

            ]
        case 'Intellectual':
            return [
                {
                    description: "Clear, informed thinking creates a foundation for positive growth and adjustment to new ideas."
                },
                {
                    name: 'Thinking',
                    Beginner: "Acknowledge your personal perspective",
                    Developing: "Gain tools to acknowledge perspectives outside your own",
                    Accomplished: "Refine the tools you have and deconstruct own perspective",
                    Exemplary: "Can see various perspectives and asses their validity"
                },
                {
                    name: 'Current',
                    Beginner: "Familiar with various sources",
                    Developing: "Validate the sources, seek more",
                    Accomplished: "Regulary check more than one source",
                    Exemplary: "Being confident in disseminating information"
                },
                {
                    name: 'Experiences',
                    Beginner: "Understand your level of exposure",
                    Developing: "Expand your exposure to a variety of creative outlets",
                    Accomplished: "Has a well developed knowledge and appreciation of the arts",
                    Exemplary: "An active participant/observed of arts on a regular basis"
                },
                {
                    name: 'Organization',
                    Beginner: "Has a clear understanding of your organizational level",
                    Developing: "Research and try methods for organization that fit with your strengths and weakness",
                    Accomplished: "Implementation of various methods across different aspects of your life",
                    Exemplary: "Implementation and utilization consistently across all aspects of your life"
                },
                {
                    name: "Learning",
                    Beginner: "Awareness of your own learning process",
                    Developing: "Familiarize yourself with the different learning styles and techniques",
                    Accomplished: "Actively use the various learning techniques in order to integrate new information into your world view",
                    Exemplary: "Sharing and dissemination of what is learned"
                }
            ]
        case 'ProfessionalAcademic':
            return [
                {
                    description: "Our academic standards and practices translate into our professional persona."
                },
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
                    description: "Learning to be a part of your community is integral to contributing to its well-being."
                },
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
                    description: "Humans have emotions, learning how to accept and manage your emotions is important."
                },
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
            case 'Health':
                return [
                    {
                        description: "Our physical well-being is our responsibility and the key to the longevity of our success."
                    },
                    {
                        name: 'Physical',
                        Beginner: "Recognition of the need for regular physical activity",
                        Developing: "Creating patterns of activity that are safe and enjoyable",
                        Accomplished: "Maintaining regular physical activity and seeking new activities",
                        Exemplary: "Enjoying consistent physical activity that is part of ongoing lifestyle management"
                    },
                    {
                        name: 'Nutritional',
                        Beginner: "Awareness of the nutritional content of food and recognition of own eating patterns",
                        Developing: "Conscious choices that balance nutritional deficiencies and hydration deficits",
                        Accomplished: "Balanced management of food and water intake with attention to nutritional needs",
                        Exemplary: "Consistent healthy approach to nutrition and choices that support good health"
                    },
                    {
                        name: 'Hygiene',
                        Beginner: "Ability to reflect on hygiene pratices and indentification of personal standards and choices",
                        Developing: "Decesions about personal hygiene made with thought to long term effects, ie: infections, stress levels, preventative care, and STD's",
                        Accomplished: "Regular self checks and preventive care for continued maintenance of personal hygiene",
                        Exemplary: "Consistent conscious patterns of self checks and integration of new information about hygiene best pratices"
                    },
                    {
                        name: 'Sleep',
                        Beginner: "Acknowledgement of necessity of sleep and reflection on sleep patterns",
                        Developing: "Conscious effort to build positive sleep patterns",
                        Accomplished: "Regular positive sleep patterns",
                        Exemplary: "Consistent positive sleep patterns and ability to seek support if patterns degenerate"
                    }
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
