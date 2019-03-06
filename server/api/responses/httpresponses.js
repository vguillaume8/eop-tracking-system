module.exports = {
    // Register responses
    onValidationError: {
        success: false,
        message: 'Please enter email and password.'
    },
    onUserSaveError: {
        success: false,
        message: 'That email address already exists.'
    },
    onUserSaveSuccess: {
        success: true,
        message: 'Successfully created new user.'
    },
    onCouldNotRegister: {
        success: false,
        message: "Could not register user"
    },
    onNotValidID:{
        success: false,
        message: "This is not a valid New Paltz ID"
    },
    onNotValidHawkmail:{
        success: false,
        message: "This is not a valid Hawkmail"
    },

    // Login responses
    onUserNotFound: {
        success: false,
        message: 'User not found.'
    },
    onAuthenticationFail: {
        success: false,
        message: 'Passwords did not match.'
    },

    // Advisor responses
    onCouldNotAddStudent: {
        success: false,
        message: "Could not add student"
    },
    onStudentAddSuccess: {
        success: true,
        message: "Student was added successfully"
    },
    onStudentAlreadyExists: {
        success: false,
        message: "Student already exists in your list"
    },
    onStudentDoesNotExist: {
        success: false,
        message: "This student does not exist"
    },
    onCouldNotRetrieve: {
        success: false,
        message: "Could not retrieve data"
    },
    onCouldNotDeleteStudent: {
        success: false,
        message: "Could not delete student"
    },
    onStudentDeleteSuccess: {
        success: true,
        message: "Student was successfully deleted"
    },
    onCouldNotUnassign:{
        success: false,
        message: "Could not unassign student from advisor"
    },
    onNotAStudent: {
        success: false,
        message: "This user is not a student"
    },

    // Pillar responses
    onUserNotFound: {
        success: false,
        message: 'User not found.'
    },
    onCouldNotRetreive: {
        success: false,
        message: 'Could not retreive data'
    },
    onPillarNotFound: {
        success: false,
        message: 'Pillars not found.'
    },
    onCouldNotSave: {
        success: false,
        message: 'Could Not Save'
    },
    onSaveSucess: {
        success: true,
        message: "Updated Successfully"
    },
    onDataSucess: {
        success: true
    },
    onCouldNotUpdate: {
        success: false,
        message: "Could not update"
    },
    onMaxValue: {
        success: false,
        message: "Max Value exceeded"
    },
    onMinValue: {
        success: false,
        message: "Min Value exceeded"
    },

    // User responses
    onUserNotFound: {
        success: false,
        message: 'User not found.'
    },
    onCouldNotRetreive: {
        success: false,
        message: 'Could not retreive data'
    },
    onPillarNotFound: {
        success: false,
        message: 'Pillars not found.'
    },
    onCouldNotSave: {
        success: false,
        message: 'Could Not Save'
    },
    onSaveSucess: {
        success: true,
        message: "Updated Successfully"
    },
};
