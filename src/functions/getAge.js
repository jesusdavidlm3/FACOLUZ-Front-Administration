export function getAge(date){
    const rawDate = new Date(date)
    const year = rawDate.getFullYear()

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

    const age = currentYear-year
    return age
}