import moment from 'moment';

const getDateFilter = (selectedTime) =>{
  let date = selectedTime === 'All Time' ? '' : `&numericFilters=created_at_i>`;;
  switch(selectedTime){
    case 'Last 24h':
      date += moment().subtract(1, 'days').unix();
      break;
    case 'Past Week':
      date += moment().subtract(1, 'weeks')
      .unix();
      break;
    case 'Past Month':
      date += moment().subtract(1,'months').unix();
      break;
    case 'Past Year':
      date += moment().subtract(1, 'years').unix();
      break;
    default:
      break;
  }
  return date;
}
const getTagsFilter = (selectedPost) => {
    switch(selectedPost) {
      case "Stories":
        return "story";
        break;
      case "Comments":
        return "comment";
        break;
      default:
        return "(story,comment)"
        break;
    }
}
export {getDateFilter, getTagsFilter};