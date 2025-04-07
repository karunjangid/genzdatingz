export const getUserProfile = async () => {
    return {
      username: 'AlexGenZ',
    };
  };
  
  export const fetchMatches = async () => {
    return [
      {
        id: 1,
        name: 'Muskan Khan',
        profilePicture: '../src/assets/match1.png',
      },
      {
        id: 2,
        name: 'Aakriti Sinha',
        profilePicture: '../src/assets/match2.png',
      },
      {
        id: 3,
        name: 'Bhavdeep Singh',
        profilePicture: '../src/assets/match3.png',
      },
    ];
  };
  