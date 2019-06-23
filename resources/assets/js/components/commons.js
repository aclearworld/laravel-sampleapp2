import Typography from "@material-ui/core/Typography";
import React from "react";
import {commonStyle} from "./commonStyle";

/**
 *  操作後にモーダル内に表示するメッセージコンポーネント
 * @param successMsg  成功時メッセージ
 * @param apiResult   reducerからのapiResult
 * @param displayErrors  apiResultの中の、表示するメッセージ
 * @returns コンポーネント
 */
export const ResultInfo = ({successMsg, apiResult, displayErrors}) => {
    if (!apiResult.hasError) {
        return <Typography variant="subtitle1">{successMsg}</Typography>
    } else {
        return (
            <React.Fragment>
                <Typography variant="subtitle1">{apiResult.errorTitle}</Typography>
                {displayErrors.map((item, index) => {
                        return item.indexs.map(i => (
                            <Typography style={commonStyle.error} key={index + i + ""}
                                        variant="subtitle1">{apiResult.errors[item.key][i]}</Typography>
                        ))
                    }
                )}
            </React.Fragment>
        )
    }
};
