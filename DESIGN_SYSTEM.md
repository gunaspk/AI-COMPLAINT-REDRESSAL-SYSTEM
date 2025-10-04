# 🎨 Design System Documentation

## AI-Powered Complaint Redressal System - React Edition

This document describes the complete design system implemented in the React application, matching modern civic tech UI/UX standards.

---

## 🎨 **Color Palette**

Our application uses a professional civic-tech color scheme:

```css
/* Primary Colors */
--primary-blue: #007bff;      /* Main actions, links */
--accent-green: #28a745;      /* Success states, resolved */
--alert-red: #dc3545;         /* High priority, errors */
--warning-orange: #ff9800;    /* In progress, medium priority */

/* Neutral Colors */
--background-light: #f8f9fa;  /* Page backgrounds */
--background-white: #ffffff;  /* Cards, containers */
--text-dark: #2c3e50;         /* Headings */
--text-gray: #6c757d;         /* Body text, labels */
--border-gray: #dee2e6;       /* Borders, dividers */

/* Gradients */
--hero-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--card-gradient: linear-gradient(to bottom, #f8f9fa, #e9ecef);
```

---

## 🧩 **Typography**

**Font Family**: System fonts for optimal performance
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

**Font Sizes**:
- Headings: `2.5rem - 3rem`
- Subheadings: `1.5rem - 2rem`
- Body: `1rem`
- Small text: `0.85rem - 0.9rem`

**Font Weights**:
- Regular: `400`
- Medium: `500`
- Semibold: `600`
- Bold: `700`

---

## ⚡ **Component Library**

### 1️⃣ **Landing Page (Home.js)**

**Implemented Features**:
✅ Full-screen hero section with gradient background  
✅ Headline: "Smart Complaint Management System"  
✅ Three CTA buttons: File Complaint, Track Status, View Leaderboard  
✅ Six feature cards with icons and descriptions  
✅ Live statistics counter (fetched from API)  
✅ How It Works section with step-by-step guide  
✅ Responsive footer with year and links  

**Design Elements**:
- Hero gradient: Purple to pink (`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`)
- Feature cards: White background, rounded corners, hover lift effect
- Icons: Lucide React icons (FileText, Search, BarChart3, etc.)
- Animations: Smooth transitions on hover, fade-in effects

**Code Location**: `client/src/pages/Home.js` + `Home.css`

---

### 2️⃣ **File Complaint Page (FileComplaint.js)**

**Implemented Features**:
✅ Multi-field form (description, image, location)  
✅ Drag & drop image upload with preview  
✅ AI-predicted category badge overlay on image  
✅ GPS auto-location with interactive Leaflet map  
✅ Anonymous mode toggle switch  
✅ Real-time priority detection based on keywords  
✅ Gradient submit button with hover effect  

**Design Elements**:
- Two-column layout (form + map side-by-side)
- Image preview with AI badge (blue background, white text)
- Priority badges: High (red), Medium (yellow), Low (green)
- Map: Leaflet.js with OpenStreetMap tiles
- Form controls: Rounded inputs, smooth focus states

**AI Features**:
- Automatic categorization on image upload
- Priority detection from description keywords
- GPS coordinates captured and displayed

**Code Location**: `client/src/pages/FileComplaint.js` + `FileComplaint.css`

---

### 3️⃣ **Track Complaint Page (TrackComplaint.js)**

**Implemented Features**:
✅ Search input for Complaint ID  
✅ Visual progress indicator (3 stages)  
✅ Status badges with color coding  
✅ Complaint details in grid layout  
✅ Image thumbnail display  
✅ Formatted timestamp  
✅ Empty state for no results  

**Design Elements**:
- Progress steps with circular icons
- Status flow: Submitted → In Progress → Resolved
- Color coding:
  - Submitted: Blue (#007bff)
  - In Progress: Orange (#ff9800)
  - Resolved: Green (#28a745)
- Details grid: 2-column responsive layout
- Card-based UI with shadows

**Visual Features**:
- Animated progress bar
- Step indicators with connecting lines
- Active step highlighting
- Responsive design for mobile

**Code Location**: `client/src/pages/TrackComplaint.js` + `TrackComplaint.css`

---

### 4️⃣ **Leaderboard Page (Leaderboard.js)**

**Implemented Features**:
✅ Top 3 departments podium display  
✅ Medal badges (🏆 Gold, 🥈 Silver, 🥉 Bronze)  
✅ Chart.js bar chart for visualizations  
✅ Full rankings table with all departments  
✅ Resolution rate percentage  
✅ Progress bars for visual metrics  
✅ Responsive grid layout  

**Design Elements**:
- Podium cards with gradient backgrounds:
  - Gold: `linear-gradient(135deg, #ffd700, #ffed4e)`
  - Silver: `linear-gradient(135deg, #c0c0c0, #e8e8e8)`
  - Bronze: `linear-gradient(135deg, #cd7f32, #d4a574)`
- Chart.js bar chart (400px height)
- Two datasets: Resolved (green) vs Total (blue)
- Hover effects on table rows
- Medal emojis for top 3

**Chart Configuration**:
```javascript
Chart.js with:
- Bar chart type
- Dual datasets (resolved/total)
- Responsive: true
- Legend position: top
- Animations enabled
```

**Code Location**: `client/src/pages/Leaderboard.js` + `Leaderboard.css`

---

### 5️⃣ **Admin Dashboard (Admin.js)**

**Implemented Features**:
✅ Statistics cards (Total, Submitted, In Progress, Resolved)  
✅ Multi-filter panel (status, priority, search)  
✅ Sortable complaints table  
✅ Action buttons: Start, Resolve, View Details  
✅ Color-coded priority tags  
✅ Status badges  
✅ Modal popup for detailed view  
✅ Refresh button for live data  
✅ Anonymous complaint indicator (🕵️)  

**Design Elements**:
- Stats cards with colored left borders
- Filter grid: 4-column responsive layout
- Table with hover effects
- Action buttons:
  - Start (orange) - Play icon
  - Resolve (green) - Check icon
  - View (blue) - Eye icon
- Modal overlay with slide-in animation
- Badge system matching status colors

**Admin Actions**:
1. Start Complaint: Changes status from "Submitted" to "In Progress"
2. Resolve Complaint: Changes status from "In Progress" to "Resolved"
3. View Details: Opens modal with full information

**Code Location**: `client/src/pages/Admin.js` + `Admin.css`

---

## 🧠 **UX Design Principles**

### Navigation
- **Navbar**: Fixed top, responsive hamburger menu on mobile
- **Links**: Home, File, Track, Leaderboard, Admin
- **Active states**: Highlighted current page
- **Logo/Branding**: Shield icon with app name

### Interactions
- **Hover effects**: All buttons scale and show shadows
- **Loading states**: Spinners during API calls
- **Success feedback**: Alert messages on form submission
- **Error handling**: User-friendly error messages
- **Smooth transitions**: 0.2s - 0.3s CSS transitions

### Accessibility
- **Color contrast**: WCAG AA compliant
- **Font sizes**: Minimum 16px for body text
- **Touch targets**: Minimum 44px for mobile buttons
- **Keyboard navigation**: Tab order logical
- **Alt text**: All images have descriptions

---

## 📱 **Responsive Design**

### Breakpoints
```css
/* Mobile First Approach */
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
```

### Mobile Optimizations
- Single column layouts on mobile
- Collapsible filters
- Stacked form fields
- Touch-friendly button sizes
- Hamburger menu navigation
- Reduced font sizes
- Compressed spacing

---

## 🎬 **Animations & Transitions**

### Implemented Animations

**Page Load**:
- Fade-in effect on cards
- Stagger delay for feature cards
- Hero text slide-up

**Interactions**:
- Button hover: Scale 1.05, shadow increase
- Card hover: Lift effect (-5px translateY)
- Modal: Slide-in from top (0.3s ease-out)

**Progress Indicators**:
- Loading spinners (1s rotation)
- Progress bars (smooth width transitions)
- Status changes (color fade)

### CSS Keyframes
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes modalSlideIn {
  from { opacity: 0; transform: translateY(-50px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

---

## 🔧 **Technical Implementation**

### React Components
- **Functional components** with hooks
- **useState** for local state management
- **useEffect** for API calls and side effects
- **useNavigate** for programmatic routing
- **useParams** for URL parameters

### API Integration
- **Axios** for HTTP requests
- **Base URL**: `http://localhost:5000/api`
- **Error handling**: Try-catch blocks
- **Loading states**: Boolean flags

### Styling Approach
- **CSS Modules**: Scoped styles per component
- **Utility classes**: Custom CSS utilities
- **Responsive grids**: CSS Grid and Flexbox
- **Variables**: CSS custom properties for consistency

---

## 📦 **Icon Library**

Using **Lucide React** icons throughout:

- `FileText` - File complaints
- `Search` - Track complaints
- `BarChart3` - Leaderboard
- `Shield` - Admin/Security
- `MapPin` - Location
- `Upload` - Image upload
- `Play` - Start action
- `Check` - Resolve action
- `Eye` - View details
- `Filter` - Filtering
- `RefreshCw` - Refresh data

---

## ✅ **Design Checklist**

### Visual Design
- [x] Consistent color palette across all pages
- [x] Professional typography hierarchy
- [x] Rounded corners on cards (8px - 12px)
- [x] Subtle shadows for depth
- [x] Balanced whitespace and padding
- [x] Gradient backgrounds for hero sections

### User Experience
- [x] Intuitive navigation (3-click rule)
- [x] Clear call-to-action buttons
- [x] Loading indicators for async operations
- [x] Success/error feedback messages
- [x] Helpful empty states
- [x] Confirmation dialogs for destructive actions

### Responsive Design
- [x] Mobile-first approach
- [x] Flexible grid layouts
- [x] Touch-friendly controls
- [x] Optimized images
- [x] Readable text on all screen sizes

### Performance
- [x] Minimal CSS bundle size
- [x] Lazy loading for images
- [x] Debounced search inputs
- [x] Optimized re-renders
- [x] Fast page transitions

---

## 🚀 **Future Enhancements**

### Planned Design Improvements
- [ ] Dark mode toggle
- [ ] Skeleton loaders instead of spinners
- [ ] Micro-interactions (confetti on success)
- [ ] Animated SVG illustrations
- [ ] Drag-and-drop image upload with progress
- [ ] Real-time notifications (toast messages)
- [ ] Advanced data visualizations
- [ ] Export reports as PDF

### Accessibility Enhancements
- [ ] ARIA labels for screen readers
- [ ] Keyboard shortcuts
- [ ] Focus indicators
- [ ] High contrast mode
- [ ] Font size controls

---

## 📚 **Design Resources**

**Inspiration Sources**:
- Government digital services (gov.uk, usa.gov)
- Modern SaaS dashboards (Linear, Notion)
- Civic tech platforms (FixMyStreet, SeeClickFix)

**Tools Used**:
- React 18.2.0
- Lucide React Icons
- Leaflet.js for maps
- Chart.js for graphs
- CSS Grid & Flexbox

---

**Designed with ❤️ for civic engagement and transparent governance**
