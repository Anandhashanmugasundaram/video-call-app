import { LANGUAGE_TO_FLAG } from "../constants";
import {Link} from 'react-router'


const FriendCard = ({friend}) => {
  return (
    <div className="card bg-base-200 p-3 hover:shadow-md transition-shadow">
        {/* user info */}
        <div className="flex items-center gap-3 mb-3">
            <div className="avatar size-12">
            <img src={friend.profilePic} alt="ProfilePic" />
            </div>
            <h3 className="font-semibold truncate">{friend.fullName} </h3>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
          {getLanguageFlag(friend.nativeLanguage)}
          Native:{friend.nativeLanguage}
          </span>

          <span className="badge badge-secondary text-xs">
          {getLanguageFlag(friend.learningLanguage)}
          Native:{friend.learningLanguage}
          </span>

          <Link to={`/chat/${friend._id}`} className="btn btn-outline rounded-full mt-1 w-full">
          Message
          </Link>
        </div>
    </div>
  )
}
export default FriendCard

export function getLanguageFlag(language) {
  if(!language) return null;
  const langlower = language.toLowerCase()
  const countryCode = LANGUAGE_TO_FLAG[langlower]

  if(countryCode){
    return(
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt={`${langlower} Flag`} className="h-3 mr-1 inline-block"/>
    )
  }
  return null
}