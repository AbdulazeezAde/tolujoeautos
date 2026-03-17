async function check() {
  const res1 = await fetch('https://images.unsplash.com/photo-1680843274944-40433b411e2b?auto=format&fit=crop&q=80&w=1200');
  console.log('Status 1:', res1.status);
  const res2 = await fetch('https://images.unsplash.com/photo-1680843277454-4d69ec3e8d18?auto=format&fit=crop&q=80&w=1200');
  console.log('Status 2:', res2.status);
}
check();
