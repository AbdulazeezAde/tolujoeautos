async function check() {
  const res = await fetch('https://images.unsplash.com/photo-1680843274944-40433b411e2b?auto=format&fit=crop&q=80&w=1200');
  console.log('Status:', res.status);
}
check();
