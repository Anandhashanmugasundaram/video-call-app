import { useState } from "react";
import useAuthHook from "../hooks/useAuthHook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { LoaderIcon } from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { CameraIcon, MapIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthHook();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    profilePic: authUser?.profilePic || "",
    location: authUser?.location || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile Created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
  console.log(error);

 
  toast.error(error.response.data.mssg);
}
  }); 

  const handleRandomAvatar = (e) => {
    e.preventDefault();
    const randomAvatar = Math.floor(Math.random() * 150) + 1;
    const avatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${randomAvatar}`;
    setFormState({...formState,profilePic:avatar})
    toast.success("Avatar generated Successfully")


  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Profile
          </h1>
          <form onSubmit={handleSubmit} className="sapce-y-6 ">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="profilepic"
                    className="w-32 h-32 mt-3  object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-accent"
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>

            <div className="form-control ">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>

              <input
                type="text"
                name="fullName"
                placeholder="Your full name"
                className="input input-bordered w-full"
                value={formState.fullName}
                
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                
              />
            </div>

            <div className="form-control ">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>

              <input
                type="text"
                name="bio"
                placeholder="Tell others about yourself"
                className="textarea textarea-bordered h-24"
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* native lang */}
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  className="select select-bordered w-full"
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    })
                  }
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              {/* learning lang */}
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  className="select select-bordered w-full" 
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      learningLanguage: e.target.value,
                    })
                  }
                >
                  <option value="">Select your learning language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            
            
            </div>
              {/* location */}
               <div className="form-control ">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute opcaity-70 size-5 left-3 transform -translate-y-1/2 text-base-content top-1/2"/>
                
                <input
                type="text"
                name="location"
                placeholder="City, Country"
                className="input input-bordered w-full pl-10"
                value={formState.location}
                onChange={(e) =>
                  setFormState({ ...formState, location: e.target.value })
                }
                
              />
                </div>
              </div>
              {/* Button */}
            <button className="btn btn-primary w-full mt-5" disabled={isPending} type="submit">
              {!isPending ? (
                <>
                <ShipWheelIcon className="size-5 mr-2"/>
                Complete Onboarding
                </>
              )  :  (
                <>
                <LoaderIcon className="animate-spin size-5 mr-2"/>
                 Onboarding...
                </>
              ) }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default OnboardingPage;
