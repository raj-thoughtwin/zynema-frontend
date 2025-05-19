import React from "react";
import styles from "./Profile.module.scss";

export default function ProfilePage() {
  // Demo user data
  const user = {
    name: "Arnoldy Chafe",
    username: "@arnoldy",
    bio: "CEO Space X. Satisfaction is everything. Standing on the new world, that’s what we want to do as well.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=cover&w=600&q=80",
    website: "www.Arnoldy.com",
    email: "Hello@adalahreza.com",
    phone: "+60 137 892 000",
    joined: "28 March, 2023",
    tags: ["UI Designer", "UX Designer", "Design System", "Product", "Successful"],
    plan: "Free",
    subscriptionStatus: "Not Subscribed",
  };

  return (
    <div className={styles.profileOuterWrap}>
      <div className={styles.profileCardModern}>
        {/* Banner/Cover */}
        <div className={styles.profileBanner}>
          <img src={user.cover} alt="cover" />
        </div>
        {/* Avatar & Name */}
        <div className={styles.profileAvatarWrap}>
          <img src={user.avatar} alt="avatar" className={styles.profileAvatar} />
        </div>
        <div className={styles.profileMainInfo}>
          <div className={styles.profileName}>{user.name}</div>
          <div className={styles.profileUsername}>{user.username}</div>
          <div className={styles.profileBio}>{user.bio}</div>
        </div>
        {/* Info Section */}
        <div className={styles.profileInfoSection}>
          <div className={styles.profileInfoItem}><i className="bi bi-globe"></i> <span>{user.website}</span></div>
          <div className={styles.profileInfoItem}><i className="bi bi-envelope"></i> <span>{user.email}</span></div>
          <div className={styles.profileInfoItem}><i className="bi bi-telephone"></i> <span>{user.phone}</span></div>
          <div className={styles.profileInfoItem}><i className="bi bi-calendar"></i> <span>{user.joined}</span></div>
        </div>
        {/* Tags/Badges */}
        <div className={styles.profileTagsWrap}>
          {user.tags.map(tag => (
            <span key={tag} className={styles.profileTag}>{tag}</span>
          ))}
        </div>
        {/* Subscription Box */}
        <div className={styles.subscriptionBox}>
          <h2>Upgrade Subscription</h2>
          <p>Unlock premium features by subscribing to a paid plan.</p>
          <button className={styles.subscribeBtn}>Subscribe Now</button>
        </div>
      </div>
    </div>
  );
}

