export const getTitle = (routeName: string): string => {
    const titles: Record<string, string> = {
      Home: 'Welcome to Home',
      Search: 'Search Articles',
      Article: 'Read Article',
    };
  
    return titles[routeName] || 'Default Title';
  };
  