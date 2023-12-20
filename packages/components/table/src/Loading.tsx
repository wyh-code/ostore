import React from "react";
import { Loading } from '@alifd/next';
import styles from './index.module.less';

interface IProps {
  visible: boolean | undefined;
}

export default ({ visible }: IProps) => {
  return visible ? (
    <div className={styles.loading}>
      <div className={styles.loadingMask}></div>
      <Loading visible={true} />
    </div>
  ) : null
}

