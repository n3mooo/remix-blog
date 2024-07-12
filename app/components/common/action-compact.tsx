import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { Form, useNavigate } from '@remix-run/react';
import { PenIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import React from 'react'

interface ActionConpactProps {
  onCreate?: () => void;
  onUpdate?: () => void;
  onDelete?: (() => void) | boolean | React.ReactNode;
}

export function ActionConpact({
  onCreate: handleCreate,
  onDelete: handleDelete,
  onUpdate: handleUpdate,
}: ActionConpactProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {handleCreate &&
        <Button
          size="sm"
          variant="flat"
          color="primary"
          onClick={handleCreate}
          isIconOnly
        >
          <PlusIcon size={16} />
        </Button>
      }

      {handleUpdate &&
        <Button
          size="sm"
          variant="flat"
          color="success"
          onClick={handleUpdate}
          isIconOnly
        >
          <PenIcon size={16} />
        </Button>}

      {handleDelete &&
        <Popover isOpen={isOpen} onOpenChange={setIsOpen} placement="bottom-end" showArrow>
          <PopoverTrigger>
            <Button size="sm" variant="flat" color="danger" isIconOnly>
              <Trash2Icon size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small font-bold">Delete post!</div>
              <div className="text-tiny">This action cannot be undone. Are you sure?</div>
              <div className="flex gap-2 mt-2 justify-end items-center">
                <Button size="sm" variant="bordered" className="text-xs py-1 min-w-max h-auto"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Form method="post">
                  <Button color="primary" size="sm" type="submit" variant="solid" className="text-xs py-1 min-w-max h-auto">
                    OK
                  </Button>
                </Form>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      }
    </>
  )
}
