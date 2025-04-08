// Sample data storage
import Boy1 from "../src/assets/Boy1.png"
import Boy2 from "../src/assets/Boy2.png"
import Boy3 from "../src/assets/Boy3.png"
import Boy4 from "../src/assets/Boy4.png"
import Boy5 from "../src/assets/Boy5.png"
import Boy6 from "../src/assets/Boy6.png"
import Boy7 from "../src/assets/Boy7.png"
import Boy8 from "../src/assets/Boy8.png"
import Boy9 from "../src/assets/Boy9.png"
import Boy10 from "../src/assets/Boy9.png"
import Girl1 from "../src/assets/Girl1.png"
import Girl2 from "../src/assets/Girl2.png"
import Girl3 from "../src/assets/Girl3.png"
import Girl4 from "../src/assets/Girl4.png"
import Girl5 from "../src/assets/Girl5.png"
import Girl6 from "../src/assets/Girl6.png"
import Girl7 from "../src/assets/Girl7.png"
import Girl8 from "../src/assets/Girl8.png"
import Girl9 from "../src/assets/Girl9.png"
import Girl10 from "../src/assets/Girl10.png"


let userProfiles = {
  boys: [
    { name: "Aarav", age: 26, instagram: "@aarav_love", profileImage: Boy1 },
    { name: "Karan", age: 28, instagram: "@karan_vibes", profileImage: Boy2 },
    { name: "Rohan", age: 24, instagram: "@rohan_hunk", profileImage: Boy3 },
    { name: "Aditya", age: 23, instagram: "@aditya_charm", profileImage: Boy4 },
    { name: "Virat", age: 27, instagram: "@virat_stylish", profileImage: Boy5 },
    { name: "Arjun", age: 25, instagram: "@arjun_hero", profileImage: Boy6 },
    { name: "Kabir", age: 26, instagram: "@kabir_vibes", profileImage: Boy7 },
    { name: "Rahul", age: 24, instagram: "@rahul_rockstar", profileImage: Boy8 },
    { name: "Siddharth", age: 23, instagram: "@siddharth_lover", profileImage: Boy9 },
    { name: "Raj", age: 22, instagram: "@raj_cool", profileImage: Boy10 },
  ],
  girls: [
    { name: "Emily", age: 24, instagram: "@emily_vibes", profileImage: Girl1 },
    { name: "Sophia", age: 25, instagram: "@sophia_dreams", profileImage: Girl2 },
    { name: "Olivia", age: 23, instagram: "@olivia_star", profileImage: Girl3 },
    { name: "Isabella", age: 24, instagram: "@isabella_grace", profileImage: Girl4 },
    { name: "Mia", age: 22, instagram: "@mia_darling", profileImage: Girl5 },
    { name: "Zara", age: 25, instagram: "@zara_sassy", profileImage: Girl6 },
    { name: "Ava", age: 23, instagram: "@ava_glow", profileImage: Girl7 },
    { name: "Lily", age: 26, instagram: "@lily_flower", profileImage: Girl8 },
    { name: "Ella", age: 22, instagram: "@ella_sparkles", profileImage: Girl9 },
    { name: "Scarlett", age: 24, instagram: "@scarlett_fierce", profileImage: Girl10 },
  ],
  userSubmissions: []
};

export const addUserProfile = (profile) => {
  userProfiles.userSubmissions.push(profile);
  return profile;
};

export const getMatches = (genderPreference) => {
  const baseProfiles = genderPreference === "Boys" ? userProfiles.boys : userProfiles.girls;
  return [...baseProfiles, ...userProfiles.userSubmissions];
};

export const getUserProfile = async () => {
  return {
    username: 'AlexGenZ',
  };
};

// Maintain backward compatibility
export const fetchMatches = async () => {
  return getMatches("Boys").concat(getMatches("Girls"));
};
  