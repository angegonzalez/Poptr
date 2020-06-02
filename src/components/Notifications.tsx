import * as React from "react";
import { Stack } from "../classes/Stack";

export interface NotificationsProps {
  notificationsStack: Stack<JSX.Element>;
}

const Notifications: React.SFC<NotificationsProps> = (props) => {
  const [notificationsStack, setnotificationStack] = React.useState(
    props.notificationsStack
  );
  const [notificationsArray, setnotificationsArray] = React.useState(
    notificationsStack.stack.toArray()
  );

  React.useEffect(() => {
    notificationsArray.map((noti, index) => {
      setTimeout(() => {
        if (notificationsStack.length > 0) {
          notificationsStack.pop();
          setnotificationsArray(notificationsStack.stack.toArray());
        }
      }, 10000 * (index + 20));
    });
  });

  return <>{notificationsArray}</>;
};

export default Notifications;
