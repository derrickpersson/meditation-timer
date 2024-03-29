export const numberFormatter = (number: number): string => {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export default numberFormatter;