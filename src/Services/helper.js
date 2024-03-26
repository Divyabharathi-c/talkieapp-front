import moment from 'moment';

  export const formatDate = (date) => {
    try {
      // Attempt to parse the date string
      const parsedDate = new Date(date);
      
      // Check if the parsed date is valid
      if (!isNaN(parsedDate)) {
        // Return the formatted date
        return parsedDate.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } else {
       
        return moment().format(('MMMM D, YYYY'));;
      }
    } catch (error) {
      
      console.error("Error formatting date:", error);
      return "Error";
    }
  };
  
