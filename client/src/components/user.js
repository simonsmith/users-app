import React from 'react';

export function User({name, avatar, username, website, email, role: {title}}) {
  return (
    <div>
      <p>{name}</p>
      <img src={avatar} alt={name} />
      <p>{username}</p>
      <p>
        <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p>
        <a href={website}>{website}</a>
      </p>
      <p>{title}</p>
    </div>
  );
}
