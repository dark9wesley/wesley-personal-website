'use client';
 
import { ProgressProvider as ProgressProviderComponent } from '@bprogress/next/app';
 
const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProviderComponent 
      height="2px"
      color="hsl(var(--muted-foreground))"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProviderComponent>
  );
};
 
export default ProgressProvider;
