import { cn } from '@/shared/lib/utils';
import { useMediaQuery } from 'react-responsive';
import { Dialog, DialogContent } from '../dialog';
import { Drawer, DrawerContent } from '../drawer';

type DialogDrawerProps = {
    open: boolean;
    onOpenChange: (val: boolean) => void;
    children: React.ReactNode;
    className?: string;
};

export function DialogDrawer({
    open: isOpen,
    onOpenChange,
    children: Content,
    className,
}: DialogDrawerProps) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    return isTabletOrMobile ? (
        <Drawer
            open={isOpen}
            onOpenChange={onOpenChange}
            repositionInputs={false}
        >
            <DrawerContent className="bg-popover">{Content}</DrawerContent>
        </Drawer>
    ) : (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className={cn(className)} withoutClose>
                {Content}
            </DialogContent>
        </Dialog>
    );
}
