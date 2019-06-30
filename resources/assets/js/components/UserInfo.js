import React from 'react';
import Typography from '@material-ui/core/Typography';
import AccountBox from '@material-ui/icons/AccountBox'

const UserIcon = ({userIconUrl}) => userIconUrl ? <img alt="ユーザーアイコン" src={userIconUrl}/> : <AccountBox/>;

/**
 * ユーザー情報表示
 * @param userName {string} ユーザー名
 * @param userIconUrl {string} ユーザーアイコンurl
 * @returns {*} コンポーネント
 */
export const UserInfo = ({userName, userIconUrl}) => {
    return (
        <React.Fragment>
            <Typography variant="subtitle1">{userName ? userName : '匿名ユーザーさん'}</Typography>
            <UserIcon userIconUrl={userIconUrl}/>
        </React.Fragment>
    )
};