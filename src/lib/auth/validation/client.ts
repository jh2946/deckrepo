export function v_username(username: string) {
    if (!username) 
        return ['']
    let errors: string[] = []
    if (username.length < 6)
        errors.push('Username should be at least 6 characters long.')
    if (username.length > 24)
        errors.push('Username should be at most 24 characters long.')
    if (!username.match(/^[a-zA-Z0-9\-_]*$/))
        errors.push('Username should only contain numbers, English letters, - or _.')

    return errors
    
}

export function v_email(email: string) {
    if (!email)
        return ['']
    let errors: string[] = []
    if (email.length > 320)
        errors.push('Email should be at most 320 characters.')
    if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
        errors.push('Invalid email.')

    return errors

}

export function v_password(password: string) {
    if (!password) 
        return ['']
    let errors = []
    if (password.length < 8)
        errors.push('Password should be at least 8 characters long.')
    if (password.length > 255)
        errors.push('Password should be at most 255 characters long.')
    if (!password.match(/^[ -~]*$/))
        errors.push('Password should only contain ASCII characters.')
    return errors
}
