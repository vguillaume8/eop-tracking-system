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
    onNotActiveUser: {
        success: false,
        message: "This is not an active account, contact EOP"
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
    onCouldNotLogin: {
        success: false,
        message: 'Could not login'
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

    // Comment responses
    onCouldNotPostComment: {
        success: false,
        message: 'Could not post comment'
    },
    onCommentPostSuccess: {
        success: true,
        message: 'Comment was posted successfully'
    },
    onCouldNotDeleteComment: {
        success: false,
        message: 'Could not delete comment'
    },
    onDeleteCommentSuccess: {
        success: true,
        message: 'Comment was successfully deleted'
    },

    // Student info upload responses
    onCouldNotUpload: {
        success: false,
        message: "Could not upload data"
    },  
    onUploadSuccess: {
        success: true,
        message: "Data successfully updated"
    },
    onNoFileUpload: {
        success: false,
        message: "Please select a file for upload"
    },
    onCouldNotDeleteFile: {
        success: false,
        message: "Could Not delete system file"
    },

    // Report generator responses
    onCouldNotGenerate: {
        success: false,
        message: "Could Not generate report"
    },

    onNotAStudent: {
        success: false,
        message: "Reports are only for students"
    },

    // Verfify responses
    onDuplicateRecord: {
        success: false,
        message: "This record is already in the database"
    },

    onCreateSuccess: {
        success: true,
        message: "Record was successfully saved"
    }
    
    
};
