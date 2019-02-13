const mongoose = require('mongoose')
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const PillarSchema = new mongoose.Schema({
    
    student_id: {
        type: String,
        unique: true,
        required: true
    },

    SelfActulization: {
        Morals: SchemaTypes.Double,
        Perception: SchemaTypes.Double,
        Gratitude: SchemaTypes.Double,
        Happiness: SchemaTypes.Double,
        Social: SchemaTypes.Double,
        Other: SchemaTypes.Double // was cut off on paper, ask eop
    },

    Emotional: {
        Attitude: SchemaTypes.Double,
        Feelings: SchemaTypes.Double,
        Empathy: SchemaTypes.Double,
        Coping: SchemaTypes.Double,
        Insight: SchemaTypes.Double,
        Management: SchemaTypes.Double
    },

    Community: {
        Physical: SchemaTypes.Double,
        Service: SchemaTypes.Double,
        Culture: SchemaTypes.Double,
        Social: SchemaTypes.Double
    },

    Intellectual: {
        Thinking: SchemaTypes.Double,
        Current: SchemaTypes.Double,
        Experiences: SchemaTypes.Double,
        Organization: SchemaTypes.Double,
        Learning: SchemaTypes.Double
    },

    Health: {
        Physical: SchemaTypes.Double,
        Nutritional: SchemaTypes.Double,
        Hygiene: SchemaTypes.Double,
        Sleep: SchemaTypes.Double 
    },

    ProfessionalAcademic: {
        Major: SchemaTypes.Double,
        Specialization: SchemaTypes.Double,
        Satisfaction: SchemaTypes.Double,
        Persona: SchemaTypes.Double,
        Ethic: SchemaTypes.Double,
        Skills: SchemaTypes.Double
    }

});
  
  
  module.exports = mongoose.model('Pillar', PillarSchema);