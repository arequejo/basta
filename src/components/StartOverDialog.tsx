import * as React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button } from './Button.tsx';

type StartOverDialogProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
};

/**
 * Although we could have our own abstraction on top of the AlertDialog, this
 * is the only alert dialog in our app, so not worth the over-abstraction atm.
 */
export function StartOverDialog({
  open,
  onCancel,
  onConfirm,
  children,
}: StartOverDialogProps) {
  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/75" />
        <AlertDialog.Content className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-sm bg-white p-6">
          <AlertDialog.Title className="text-lg">
            Do you really want to start over?
          </AlertDialog.Title>

          <AlertDialog.Description className="text-sm text-gray-700">
            Current progress will be lost
          </AlertDialog.Description>

          <div className="mt-6 flex justify-end space-x-4">
            <AlertDialog.Cancel asChild>
              <Button color="green" onClick={onCancel}>
                No
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button color="orange" onClick={onConfirm}>
                Yes
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
