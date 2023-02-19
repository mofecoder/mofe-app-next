export const EmailValidator = {
  value: /^[\w\-._]+@[\w\-._]+.[A-Za-z]+$/,
  message: 'メールアドレスを入力してください'
}

export const PasswordValidator = (
  password: string | undefined,
  required?: string
) => {
  if (!password) return required ?? 'このフィールドは必須です'
  const s = [
    (s: string) => /[a-z]/.test(s),
    (s: string) => /[A-Z]/.test(s),
    (s: string) => /\d/.test(s),
    (s: string) => /[`~!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]/.test(s)
  ]
  return (
    (s.filter((f) => f(password)).length >= 3 &&
      password.length >= 8 &&
      password.length <= 128) ||
    'パスワードの形式が誤っています'
  )
}

export const UsableSymbols = Array.from('`~!@#$%^&*()_+-={}[]|:;"\'<>,.?/')
